import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Pegawai from './pegawai'
import Login from './login'
import Home from './home'
import Register from './register'

const Pages = () => (
 <Switch>
     <Route exact path='/' component={Home} />
     <Route path='/pegawai' component={Pegawai} />
     <Route path='/login' component={Login} />
     <Route path='/register' component={Register} />
 </Switch>
)
export default Pages