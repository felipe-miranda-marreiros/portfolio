import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../api/client";
import { isSignedIn, setSignedIn } from "../auth";
import { TextField } from "../components/fields";
import { Icon, Spinner } from "../components/Icon";
import "../styles/sign-in.css";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: () => {
    if (isSignedIn()) throw redirect({ to: "/profile" });
  },
  component: SignIn,
});

const schema = z.object({
  email: z.string().trim().min(1, "enter your email").pipe(z.email("enter an email like name@example.com")),
  password: z.string().min(1, "enter your password"),
});

function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const signIn = useMutation({
    mutationFn: (values: z.infer<typeof schema>) => api.signIn(values.email, values.password),
    onSuccess: ({ email }) => {
      setSignedIn(email);
      navigate({ to: "/profile" });
    },
  });

  return (
    <main className="sign-in" id="main">
      <form className="sign-in__form" noValidate onSubmit={handleSubmit((values) => signIn.mutate(values))}>
        <h1 className="sign-in__title">Sign in to Portfolio CMS</h1>
        {signIn.isError && (
          <div className="ui-message" data-tone="danger" role="alert">
            <Icon name="circleAlert" />
            <p className="ui-message__title">Couldn’t sign in</p>
            <p className="ui-message__body">{signIn.error.message}</p>
          </div>
        )}
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          registration={register("email")}
          error={formState.errors.email?.message}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          registration={register("password")}
          error={formState.errors.password?.message}
        />
        <button type="submit" className="ui-button" aria-busy={signIn.isPending || undefined}>
          <Spinner />
          <span>{signIn.isPending ? "Signing in…" : "Sign in"}</span>
        </button>
      </form>
    </main>
  );
}
