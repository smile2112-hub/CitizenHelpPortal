# Citizen Help Portal

Citizen Help Portal is a civic issue reporting system with a public citizen
portal, a staff administration portal, and an ASP.NET Core API.

## Repository layout

| Path | Purpose |
| --- | --- |
| `Backend/CitizenPortal.API` | ASP.NET Core API, migrations, Swagger, and health endpoint |
| `Frontend/Citizen-Portal` | Public citizen-facing Angular application |
| `Frontend/admin-portal` | Staff administration Angular application |

## Requirements

- .NET SDK 8
- Node.js 22 and npm
- SQL Server for the API database

## Local development

1. Copy `.env.example` to `.env` and set a database connection string and a
   strong JWT key.
2. Set the same values for local API execution, for example with
   `dotnet user-secrets` from `Backend/CitizenPortal.API`.
3. Start the API:

   ```bash
   cd Backend
   dotnet run --project CitizenPortal.API
   ```

4. Start either frontend in another terminal:

   ```bash
   cd Frontend/Citizen-Portal
   npm ci
   npm start
   ```

   The administration portal uses the same commands from
   `Frontend/admin-portal` and runs on port `4300`.

The API is available at `http://localhost:5298`; Swagger is enabled in the
Development environment. Both frontends use `/api` paths and proxy them to the
local API.

## Docker Compose

The compose file builds the API and both frontends. It expects the variables in
`.env.example`:

```bash
cp .env.example .env
# edit .env and provide DATABASE_CONNECTION_STRING and JWT_KEY
docker compose up --build
```

The portals are available on ports `4200` and `4300`. The API health check is
available at `/health`.

## Verification

```bash
dotnet build Backend/CitizenPortal.sln --configuration Release
cd Frontend/Citizen-Portal && npm ci && npm run build
cd ../admin-portal && npm ci && npm run build
```

GitHub Actions runs these checks for pushes and pull requests. Versioned
container images are published to GitHub Container Registry when a release tag
is pushed. The workflow does not deploy to a cloud provider automatically;
connect the published images to the target platform and provide the required
environment variables there.

## Configuration and security

Secrets are intentionally not committed. Configure the database, JWT signing
key, seed administrator credentials, and SMTP settings through environment
variables or the deployment platform's secret store. The seed administrator is
created only when both seed credentials are supplied.
