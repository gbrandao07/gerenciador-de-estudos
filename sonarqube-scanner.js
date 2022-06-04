const scanner = require('sonarqube-scanner');

scanner({
    serverUrl: "http://localhost:9000",
    token:"c62b21e3af73426c8589c1a8fb05bcd31774d7b6",
    options: {
        "sonar.sources": "./src",
        "sonar.exclusions": "**/__tests__/**",
        "sonar.tests": "./src",
        "sonar.test.inclusions": "**/*.test.js",
        "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
        "sonar.testExecutionReportPaths": "test-report.xml"
    },
},() => process.exit());