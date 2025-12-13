# OpenCATS Setup for CV Testing

OpenCATS is an open-source Applicant Tracking System (ATS) that can be used to test how your CV is parsed and displayed.

## Installation

1. **Prerequisites**: Docker and Docker Compose must be installed

2. **Start OpenCATS**:
   ```bash
   cd opencats
   docker-compose up -d
   ```

3. **Access OpenCATS**:
   - Open your browser and go to: `http://localhost`
   - Follow the installation wizard

4. **Upload your CV**:
   - Once OpenCATS is running, you can upload your CV PDF
   - The system will parse it and show how an ATS would read it

## Testing Your CV

1. Export your CV as PDF from the browser (Cmd+P → Save as PDF)
2. Upload it to OpenCATS
3. Check how the ATS parses:
   - Personal information extraction
   - Skills recognition
   - Experience parsing
   - Education details

## Stop OpenCATS

```bash
cd opencats
docker-compose down
```
