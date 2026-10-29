import { type DragEvent, useRef, useState } from "react";
import { Icon } from "./Icon";

type State = "idle" | "dragover" | "uploading" | "error";

const MAX_BYTES = 5 * 1024 * 1024;
const MIN_SIDE = 800;

/** Checks a file against the upload rules and returns what's wrong with it, if anything. */
async function problemWith(file: File): Promise<string | null> {
  if (!["image/jpeg", "image/png"].includes(file.type)) return "Use a JPG or PNG image.";
  if (file.size > MAX_BYTES) return "The image is over 5 MB. Use a smaller file.";
  const image = await createImageBitmap(file);
  const side = Math.min(image.width, image.height);
  return side < MIN_SIDE
    ? `The image is ${image.width}×${image.height}. Use one at least ${MIN_SIDE}px on its shorter side.`
    : null;
}

/**
 * The image upload component for the Owner's portrait. Uploading is simulated until the API's storage exists:
 * the file is checked, shown as progress, then kept as a local object URL.
 */
export function PortraitUpload({
  value,
  initials,
  onChange,
}: {
  value?: string;
  initials: string;
  onChange: (url: string | undefined) => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [problem, setProblem] = useState("");
  const [fileName, setFileName] = useState("");
  const timer = useRef<number>(undefined);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    const found = await problemWith(file).catch(() => "That file couldn’t be read as an image.");
    if (found) {
      setProblem(found);
      setState("error");
      return;
    }
    setState("uploading");
    setProgress(0);
    timer.current = window.setInterval(() => {
      setProgress((current) => {
        if (current < 100) return current + 20;
        window.clearInterval(timer.current);
        setState("idle");
        onChange(URL.createObjectURL(file));
        return current;
      });
    }, 150);
  };

  const cancel = () => {
    window.clearInterval(timer.current);
    setState("idle");
  };

  const drag = (over: boolean) => (event: DragEvent) => {
    event.preventDefault();
    if (state !== "uploading") setState(over ? "dragover" : "idle");
  };

  const uiState = state === "idle" ? (value ? "done" : "empty") : state;
  const title = {
    empty: "Drop a portrait here, or choose a file",
    dragover: "Drop to upload",
    uploading: `Uploading ${fileName}…`,
    done: "Current portrait",
    error: "That file couldn’t be used",
  }[uiState];

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: dropping a file is a shortcut; the Choose image button is the accessible way in.
    <div
      className="ui-upload"
      data-state={uiState}
      onDragOver={drag(true)}
      onDragLeave={drag(false)}
      onDrop={(event) => {
        event.preventDefault();
        upload(event.dataTransfer.files[0]);
      }}
    >
      {value && uiState === "done" ? (
        <img className="ui-avatar" src={value} alt="Current portrait" />
      ) : (
        <span className="ui-avatar" role="img" aria-label="No portrait yet">
          {initials || <Icon name="user" />}
        </span>
      )}
      <div className="ui-upload__body">
        <p className="ui-upload__title">{title}</p>
        {uiState === "uploading" ? (
          <progress max={100} value={progress} aria-label="Upload progress">
            {progress}%
          </progress>
        ) : uiState === "error" ? (
          <p className="ui-field__error" role="alert">
            <Icon name="circleAlert" />
            <span>{problem}</span>
          </p>
        ) : (
          <p className="ui-field__hint">JPG or PNG, at least 800px on the shorter side, up to 5 MB.</p>
        )}
        <div className="ui-upload__actions">
          {uiState === "uploading" ? (
            <button type="button" className="ui-button" data-variant="ghost" data-size="sm" onClick={cancel}>
              Cancel
            </button>
          ) : (
            <>
              <input
                type="file"
                id="portrait"
                className="ui-visually-hidden"
                accept="image/jpeg,image/png"
                onChange={(event) => {
                  upload(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
              <label htmlFor="portrait" className="ui-button" data-variant="secondary" data-size="sm">
                <Icon name="upload" />
                <span>{value ? "Replace" : "Choose image"}</span>
              </label>
              {value && (
                <button
                  type="button"
                  className="ui-button"
                  data-variant="danger"
                  data-size="sm"
                  onClick={() => onChange(undefined)}
                >
                  <Icon name="trash" />
                  <span>Remove</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
