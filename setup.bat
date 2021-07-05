cd /D "%~dp0"
cd source
ECHO Please make sur 
ECHO Creating Node_Modules symlinks
mklink /D "generator\node_modules" "node_modules"
mklink "generator\package.json" "package.json"
mklink "generator\package-lock.json" "package-lock.json"
PAUSE