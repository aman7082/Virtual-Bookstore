@echo off
echo Starting Spring Boot Application...
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
pause
