module.exports = {
  
  /**
   * Server configuration
   */
  
  HOST           : "localhost",
  PORT           : 3000,
  RELOAD_PORT    : 8001,
  
  /**
   * CoffeeLint options.
   * @see http://www.coffeelint.org/
   */
  
  COFFEE_LINT_OPTS: {
    no_tabs: {
      level: "error"
    },
    no_trailing_whitespace: {
      level: "error"
    },
    max_line_length: {
      value: 100,
      level: "error"
    },
    camel_case_classes: {
      level: "error"
    },
    indentation: {
      value: 2,
      level: "ignore"
    },
    no_implicit_braces: {
      level: "ignore"
    },
    no_trailing_semicolons: {
      level: "error"
    },
    no_plusplus: {
      level: "ignore"
    },
    no_throwing_strings: {
      level: "error"
    },
    cyclomatic_complexity: {
      value: 11,
      level: "ignore"
    },
    line_endings: {
      value: "unix",
      level: "ignore"
    },
    no_implicit_parens: {
      level: "ignore"
    }
  },
  
  /**
   * Uglify options for minification
   * @see https://github.com/mishoo/UglifyJS/
   */
  
  UGLIFY_OPTS: {
    mangle: {
      toplevel: true
    },
    squeeze: {
      dead_code: false
    },
    codegen: {
      quote_keys: false
    }
  }
  
}
