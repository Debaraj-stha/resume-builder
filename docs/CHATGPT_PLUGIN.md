# ResuAIBuilder ChatGPT plugin

This repository exposes a stateless Streamable HTTP MCP endpoint at `/api/mcp`.

## Tools

- `analyse_cv`
- `match_job`
- `generate_cover_letter`
- `get_ats_report`

Every tool uses applicant-supplied facts only and requires the result to be verified. Tool inputs are length-limited and treated as untrusted data. The endpoint does not intentionally persist CV text.

## Authentication

The MCP endpoint requires a Supabase-issued bearer access token and validates it with Supabase Auth. Configure:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
PUBLIC_SITE_URL=https://your-production-domain.example
```

Do not expose the service-role key. Configure Supabase's OAuth server for the ChatGPT client and add the exact production redirect URI displayed by the OpenAI plugin management page. The redirect URI normally follows the form `https://chatgpt.com/connector/oauth/{callback_id}`. Do not guess the callback ID.

The protected-resource metadata is published at:

```text
https://your-production-domain.example/.well-known/oauth-protected-resource
```

## OpenAI submission checklist

1. Deploy the production MCP endpoint over HTTPS.
2. Configure Supabase OAuth for the ChatGPT redirect URI.
3. Verify a separate user cannot access another user's account or data.
4. Confirm `/privacy`, `/terms`, `/contact`, and `/chatgpt-integration` are publicly accessible.
5. Test every tool in ChatGPT developer mode with realistic but non-sensitive sample CV text.
6. Confirm tool descriptions, annotations and outputs accurately describe behaviour.
7. Capture screenshots and prepare the app name, icon, description, category and support contact.
8. Submit through the OpenAI plugin submission portal.

Directory availability is not automatic. OpenAI must review and approve the integration before it can be publicly installed or proactively suggested.
