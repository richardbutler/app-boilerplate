maths = require "util/maths"

describe "maths", ->
  
  it "should add numbers together", ->
    
    value = maths.add 3, 4
    value.should.equal 7
