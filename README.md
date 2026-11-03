# TikTo Frontend

Static frontend built with Vite and vanilla JavaScript. The production artifact is `dist/`, suitable for a private S3 bucket served through CloudFront.

## Local development

Run the backend on port `3000`, then:

```bash
npm install
npm run dev
```

Vite serves the UI at `http://localhost:5173` and proxies `/api/*` to `http://localhost:3000`.

## Production build

```bash
npm run build
```

Upload the generated `dist/` directory to S3. With one CloudFront distribution, route the default behavior to S3 and `/api/*` to the backend origin. Leave `VITE_API_ORIGIN` empty so requests remain same-origin.

Do not place secrets or AWS credentials in any `VITE_*` variable; those values are embedded in browser assets.

## CI/CD

Pull requests targeting `dev` or `main` run formatting, lint, unit tests and coverage. Pushes to those branches repeat the quality gate, scan the source with Trivy, upload `dist/` to S3, then invalidate CloudFront. The `dev` branch deploys through the `dev` GitHub Environment and `main` deploys through `prod`. SonarQube analysis is handled automatically outside the GitHub Actions workflow.

Configure these GitHub organization or repository settings:

- Environment variable `AWS_DEPLOY_ROLE_ARN`: Terraform output `github_deploy_role_arn` for dev or `github_frontend_deploy_role_arn` for prod.
- Variable `AWS_REGION`: `ap-southeast-2`.
- Environment variable `FRONTEND_BUCKET_NAME`: Terraform output with the same name.
- Environment variable `CLOUDFRONT_DISTRIBUTION_ID`: Terraform output with the same name.
