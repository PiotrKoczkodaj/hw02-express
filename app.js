import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { contactsRouter }  from './contacts/contactRoutes.js';
import { registerRouter } from './registeration/registerRoutes.js';
import { loginRouter } from './login/loginRoutes.js';
import { logoutRouter } from './logout/logoutRoute.js';

export const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/users/signup', registerRouter)
app.use('/user/login', loginRouter)
app.use('/users/logout',logoutRouter)

app.use((req, res) => {
   res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})



