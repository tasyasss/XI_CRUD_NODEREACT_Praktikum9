import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Pegawai from './pegawai'
import Login from './login'
import Home from './home'

const Pages = () => (
 <Switch>
     <Route exact path='/' component={Home} />
     <Route path='/pegawai' component={Pegawai} />
     <Route path='/login' component={Login} />
 </Switch>
)
export default Pages