# Citizen Portal API

The ASP.NET Core API is in `CitizenPortal.API`. It uses SQL Server and applies
Entity Framework migrations during startup.

Required production settings are supplied through environment variables:

- `ConnectionStrings__DefaultConnection`
- `Jwt__Key`
- `Jwt__Issuer`
- `Jwt__Audience`

Optional email and initial administrator settings are documented in the root
`.env.example` file.
