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

Open pull requests from working branches to `dev`. CI checks the prospective merge, and every eligible same-repository pull request targeting `dev` is squash-merged after CI succeeds. Documentation-only changes skip the expensive format, lint, test and build job.

Merges to `dev` deploy the development environment. Production has no `main` promotion branch: run the **Release production** workflow from `dev` with a new semantic version such as `v1.2.3`. The workflow verifies the source, deploys through the protected `prod` environment, then creates the immutable GitHub release. SonarQube analysis is handled automatically outside GitHub Actions.

Configure these GitHub organization or repository settings:

- Make `dev` the default branch and protect it with the `CI` checks required and branches required to be up to date.
- Enable repository auto-merge.
- Allow GitHub Actions workflow permissions to read and write so the auto-merge job can update pull requests.
- Environment variable `AWS_DEPLOY_ROLE_ARN`: Terraform output `github_deploy_role_arn` for dev or `github_frontend_deploy_role_arn` for prod.
- Variable `AWS_REGION`: `ap-southeast-2`.
- Environment variable `FRONTEND_BUCKET_NAME`: Terraform output with the same name.
- Environment variable `CLOUDFRONT_DISTRIBUTION_ID`: Terraform output with the same name.
- Protect the `prod` GitHub Environment with required reviewers.
