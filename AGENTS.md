<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content lives in src/lib/portfolio-data.ts and also feeds the AI assistant prompt (src/routes/api/chat.ts), so the assistant never drifts from the page.
- Contact messages are inserted from the browser into a public insert-only table; nobody can read them through the public API.
