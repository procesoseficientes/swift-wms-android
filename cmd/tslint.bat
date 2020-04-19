tslint %REPO%\ionic\3pl-suite\swift-3pl-mobile\src\**\*.ts ^
    --project .\tsconfig.json --rules-dir  %REPO%\ionic\3pl-suite\swift-3pl-mobile\ --format stylish ^
    && tslint %REPO%\ionic\3pl-suite\swift-3pl-mobile\test*\**\*.ts ^
    --project .\tsconfig.json --rules-dir  %REPO%\ionic\3pl-suite\swift-3pl-mobile\ --format stylish
