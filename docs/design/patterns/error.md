# Errors

Demo: `/patterns/#p-error` and `/patterns/#p-forms`. Components: [field](../components/field.md) error, [form error summary](../components/error-summary.md), [inline message](../components/message.md), [toast](../components/toast.md), [button](../components/button.md).

## Where an error appears

| Error | Where | Component |
| --- | --- | --- |
| A field's value is wrong | Under the field, and listed in the summary | Field error plus [form error summary](../components/error-summary.md) |
| A save or publish failed (network, server) | A danger toast with Retry; the form keeps everything typed | [Toast](../components/toast.md) |
| A CMS page or list couldn't load | In place of the content, with "Try again" | Danger [inline message](../components/message.md) |
| A Portfolio page couldn't load | A full error page in the current Locale | See below |
| A file was rejected | In the upload zone, saying what's wrong with the file | [Image upload](../components/upload.md) error state |

## Rules

- **Say what happened and what to do.** "Couldn’t load experience / The API didn’t answer. Nothing was lost." plus "Try again". Never a code alone ("Error 500").
- **Keep the Owner's work.** A failed save never clears a form or navigates away.
- **Errors aren't colour.** Every error has an icon and words; fields also get `aria-invalid`.
- **Announce, don't steal focus,** except the form error summary, which takes focus after a failed submit because the Owner has to act on it.
- **Retry is a button** that repeats the request; after a second failure the message adds the next step ("If this keeps happening, check the API is running.").

## The Portfolio error page

When Content can't be loaded, the Portfolio shows a page in the URL's Locale, in the same world as the rest of the site: a headline-size sentence ("Something went wrong on our side." / "Algo deu errado do nosso lado."), one line with a way to reach the Owner by email, and a "Reload the page" action. A missing page (404) uses the same layout with its own sentence and a link to the home page. Neither shows technical detail to Visitors.
