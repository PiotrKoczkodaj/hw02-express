import { contactsRouter } from './contacts/contactRoutes.js';
import { currentRouter } from './user/userCurrentRoutes.js';
import cors from 'cors';
import express from 'express';
import { getAvatarRouter } from './public/showAvatarRouter.js';
import { logoutRouter } from './logout/logoutRoute.js';
import { loginRouter } from './login/loginRoutes.js';
import logger from 'morgan';
import { updateAvatarRouter } from './updateAvatar/updateAvatarRouter.js';
import { uploadImageRouter } from './public/uploadImageRouter.js';
import { registerRouter } from './registeration/registerRoutes.js';
import { verificationRouter } from './verification/verificationRoutes.js';

export const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/users/signup', registerRouter)
app.use('/user/login', loginRouter)
app.use('/users/logout', logoutRouter)
app.use('/users/current',currentRouter)
app.use('/avatars', getAvatarRouter)
app.use('/upload',uploadImageRouter)
app.use('/users/avatars', updateAvatarRouter)
app.use('/verify',verificationRouter)

app.use((req, res) => {
   res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})



