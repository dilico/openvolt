.DEFAULT_GOAL := all

all: header install-api install-ui dev

header:
	@echo "\n"
	@echo ":'#######::'########::'########:'##::: ##:'##::::'##::'#######::'##:::::::'########:"
	@echo "'##.... ##: ##.... ##: ##.....:: ###:: ##: ##:::: ##:'##.... ##: ##:::::::... ##..::"
	@echo " ##:::: ##: ##:::: ##: ##::::::: ####: ##: ##:::: ##: ##:::: ##: ##:::::::::: ##::::"
	@echo " ##:::: ##: ########:: ######::: ## ## ##: ##:::: ##: ##:::: ##: ##:::::::::: ##::::"
	@echo " ##:::: ##: ##.....::: ##...:::: ##. ####:. ##:: ##:: ##:::: ##: ##:::::::::: ##::::"
	@echo " ##:::: ##: ##:::::::: ##::::::: ##:. ###::. ## ##::: ##:::: ##: ##:::::::::: ##::::"
	@echo ". #######:: ##:::::::: ########: ##::. ##:::. ###::::. #######:: ########:::: ##::::"
	@echo ":.......:::..:::::::::........::..::::..:::::...::::::.......:::........:::::..:::::"
	@echo "\n"

install-api:
	@echo "Install dependencies for meter-api (server)"
	@cd ./meter-api; npm install
	@echo "\n"
	@echo "\n"

install-ui:
	@echo "Install dependencies for meter-ui (client)"
	@cd ./meter-ui; npm install
	@echo "\n"
	@echo "\n"

dev:
	@echo "Run meter-api (server) and meter-ui (client)"
	@make -j 2 dev-api dev-ui

dev-api:
	@cd ./meter-api; npm run dev

dev-ui:
	@cd ./meter-ui; npm run dev