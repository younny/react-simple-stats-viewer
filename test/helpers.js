import { expect } from 'chai'
import {
  mount,
  render,
  shallow,
  configure
} from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

global.sinon = sinon

global.mount = mount
global.render = render
global.shallow = shallow

global.expect = expect
