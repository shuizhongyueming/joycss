BIN := ./node_modules/.bin
REPORTER ?= spec
SRC = $(wildcard index.js lib/*.js)
TESTS = $(wildcard test/*.js)
MOCA_OPT = ''

test:
	@$(BIN)/gnode $(BIN)/_mocha \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout 5s \
		$(MOCA_OPT)

node_modules: package.json
	@npm install
	@touch node_modules

coverage: $(SRC) $(TESTS)
	@$(BIN)/gnode $(BIN)/istanbul cover \
	  $(BIN)/_mocha -- \
	    --reporter $(REPORTER) \
	    --require co-mocha \
	    --timeout 5s

clean:
	@rm -rf coverage test/fixtures/*/{components,deps,out,build.js}
	@rm -rf examples/*/{components,build*}

.PHONY: test clean