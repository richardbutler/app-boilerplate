require [ "cs!app" ], ( app ) ->

mocha.setup 'bdd'

$ ->

  mocha
    #.globals(['foo', 'bar']) // acceptable globals
    .run()