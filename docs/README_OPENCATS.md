# OpenCATS Installation & CV Testing Guide

> ⚠️ **Note**: OpenCATS nécessite Docker. Si vous ne voulez pas installer Docker, consultez `ATS_TESTING_ALTERNATIVES.md` pour des alternatives plus légères (outils en ligne gratuits, scripts locaux).

## What is OpenCATS?

OpenCATS is an open-source Applicant Tracking System (ATS) that allows you to test how your CV is parsed and interpreted by recruitment systems.

## Installation Steps

### 1. Install Docker

**On macOS:**
```bash
# Install Docker Desktop from: https://www.docker.com/products/docker-desktop
# Or use Homebrew:
brew install --cask docker
```

**On Linux:**
```bash
# Follow instructions at: https://docs.docker.com/engine/install/
```

### 2. Start OpenCATS

Once Docker is installed, you can use the provided script:

```bash
./start-opencats.sh
```

Or manually:

```bash
cd opencats/docker
docker-compose up -d
```

This will:
- Download and start MySQL database
- Download and start PHP/Apache server
- Set up OpenCATS application

### 3. Access OpenCATS

1. Open your browser: `http://localhost`
2. Follow the installation wizard:
   - Create admin account
   - Configure database (already set up by Docker)
   - Complete setup

### 4. Test Your CV

1. **Export your CV as PDF:**
   - Go to `http://localhost:3000` (your CV)
   - Press Cmd+P (Mac) or Ctrl+P (Windows/Linux)
   - Save as PDF

2. **Upload to OpenCATS:**
   - Log in to OpenCATS
   - Go to "Add Candidate"
   - Upload your CV PDF
   - Check how it's parsed:
     - Personal information extraction
     - Skills recognition
     - Experience parsing
     - Education details

### 5. Stop OpenCATS

```bash
cd opencats
docker-compose down
```

## Alternative: Online ATS Testing Tools

If Docker installation is complex, you can also test your CV with:
- **Jobscan** (jobscan.co) - Free ATS checker
- **Resume Worded** (resumeworded.com) - ATS optimization
- **VMock** - Resume scoring

## Notes

- OpenCATS requires Docker to run
- The CV is already optimized for ATS (Schema.org, semantic HTML)
- Test both French (`/`) and English (`/en`) versions
