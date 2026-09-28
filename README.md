# cdk import requires SetIdentifier for AWS::Route53::RecordSet and skips import if omitted recreation

Steps:
1. Manually create a Simple A Record a Route 53 hosted zone (No weighting or other advanced record features)
2. Copy `.env.example`
```bash
cp .env.example .env
```
3. Populate `.env`
4. Run `npm run cdk:import`
5. Follow prompt using default values until `SetIdentifier`

