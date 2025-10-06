# I18N Hygiene System

A comprehensive system for analyzing and maintaining internationalization (i18n) files in the project.

## Overview

The i18n hygiene system provides tools to analyze, validate, and maintain consistency across all locale files. It helps ensure that all translations are complete, properly formatted, and consistent.

## Available Scripts

### Main Analysis Script

```bash
npm run i18n:analyze
```

The main analysis script provides a comprehensive overview of all locale files including:

- Total number of locales and keys
- Missing keys across locales
- Extra keys not in reference locale
- Empty values
- Type inconsistencies
- File sizes and line counts
- Detailed recommendations

### Individual Hygiene Commands

#### Validate JSON Syntax

```bash
npm run i18n:validate-json
```

Validates that all locale JSON files have correct syntax.

#### Check for Missing Keys

```bash
npm run i18n:check-missing
```

Checks for missing translation keys and exits with error code if any are found.

#### Check for Empty Values

```bash
npm run i18n:check-empty
```

Identifies empty or null translation values across all locales.

#### Sort Keys Alphabetically

```bash
npm run i18n:sort-keys
```

Sorts all keys in locale files alphabetically for better organization.

#### Remove Unused Keys

```bash
npm run i18n:remove-unused
```

Removes keys that exist in locale files but not in the reference locale (English).

## Features

### Comprehensive Analysis

- **Key Consistency**: Ensures all locales have the same keys as the reference locale
- **Type Safety**: Validates that values have consistent types across locales
- **Empty Value Detection**: Identifies missing translations
- **File Statistics**: Provides line counts and file sizes for each locale
- **Duplicate Detection**: Finds keys with identical values across multiple locales

### Color-Coded Output

- 🟢 Green: Success/No issues
- 🟡 Yellow: Warnings/Recommendations
- 🔴 Red: Errors that need attention

### Detailed Reporting

- Summary statistics
- Locale-by-locale breakdown
- Specific recommendations for fixes
- Suggested hygiene commands

## Usage Examples

### Basic Analysis

```bash
# Run full analysis
npm run i18n:analyze

# Export results to JSON
npm run i18n:analyze -- --export
```

### CI/CD Integration

```bash
# Check for missing keys (exits with error if found)
npm run i18n:check-missing

# Validate all JSON files
npm run i18n:validate-json
```

### Maintenance Tasks

```bash
# Sort all keys alphabetically
npm run i18n:sort-keys

# Remove unused keys
npm run i18n:remove-unused

# Check for empty values
npm run i18n:check-empty
```

## File Structure

```
scripts/
├── i18n-hygiene.mjs          # Main analysis script
├── i18n-validate-json.mjs    # JSON validation
├── i18n-check-empty.mjs      # Empty value detection
├── i18n-sort-keys.mjs        # Key sorting
└── i18n-remove-unused.mjs    # Unused key removal
```

## Configuration

The scripts use the following configuration:

- **Locales Directory**: `src/lib/locales/`
- **Reference Locale**: `en.json` (English)
- **File Pattern**: `*.json`

## Output Format

### Console Output

The scripts provide color-coded console output with:

- Summary statistics
- Detailed breakdown by locale
- Specific issues and recommendations
- Suggested fix commands

### JSON Export

Use `--export` flag to generate a detailed JSON report:

```bash
npm run i18n:analyze -- --export
```

This creates `i18n-hygiene-report.json` with complete analysis data.

## Best Practices

1. **Regular Analysis**: Run `npm run i18n:analyze` regularly to catch issues early
2. **CI Integration**: Include `npm run i18n:check-missing` in your CI pipeline
3. **Key Sorting**: Use `npm run i18n:sort-keys` to maintain consistent key ordering
4. **Validation**: Always run `npm run i18n:validate-json` before committing changes
5. **Cleanup**: Periodically use `npm run i18n:remove-unused` to remove obsolete keys

## Troubleshooting

### Common Issues

1. **JSON Syntax Errors**: Use `npm run i18n:validate-json` to identify and fix syntax issues
2. **Missing Keys**: Run `npm run i18n:check-missing` to see which keys need to be added
3. **Type Inconsistencies**: The main analysis will show type mismatches between locales
4. **Empty Values**: Use `npm run i18n:check-empty` to find incomplete translations

### Error Codes

- **Exit Code 0**: Success, no issues found
- **Exit Code 1**: Issues found that need attention

## Integration with Existing Workflow

The i18n hygiene system integrates seamlessly with the existing project workflow:

```bash
# Add to your regular hygiene check
npm run hygiene && npm run i18n:analyze

# Or include in pre-commit hooks
npm run i18n:validate-json && npm run i18n:check-missing
```

## Future Enhancements

Potential improvements for the i18n hygiene system:

- Automatic key addition for missing translations
- Translation quality scoring
- Integration with translation services
- Automated translation suggestions
- Key usage analysis across the codebase
