/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import login_bg from '../../assets/login_bg.jpg'
import logo from '../../assets/logo_dark.png'
import Toastify from '../../components/Toastify'
import { userLogin } from '../../redux/feature/auth/authAction'
import { SUCCESS } from '../../redux/feature/notification/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'

interface ILoginFormError {
  email: string | null
  password: string | null
}
interface ILoginForm {
  email: string
  password: string
}
const InputField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#EFF3F4',
    '& fieldset': {
      borderColor: '#818D90',
    },
    '&:hover fieldset': {
      borderColor: '#818D90',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#818D90',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#949ea3',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
  },
})

export default function Login() {
  const theme = useTheme()
  const [isLoading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const { error, success } = useAppSelector(state => state.auth)
  // login error state
  const [userInfoError, setUserInfoError] = useState<ILoginFormError>({
    email: null,
    password: null,
  })
  // login data state
  const [userInfo, setUserInfo] = useState<ILoginForm>({
    email: '',
    password: '',
  })

  // handle Change function to take login information
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // login information store in state
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  // validate login form
  const validateForm = () => {
    const { email, password } = userInfo
    let emailError
    let passwordError
    if (email !== '' && email) {
      emailError = !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(
        email,
      )
        ? 'Invalid e-mail address'
        : null
    } else {
      emailError = 'E-mail is required.'
    }
    if (password !== '' && password) {
      passwordError =
        password.length < 1 ? 'Password must be at least 1 characters' : null
    } else {
      passwordError = 'Password is required.'
    }
    setUserInfoError({ email: emailError, password: passwordError })

    return !emailError && !passwordError
  }

  // handle submit for login
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      dispatch(userLogin(userInfo)).then((res) => {
        if(res?.error) {
          setLoading(false)
        }
        dispatch(
          setNotification({
            open: true,
            message: 'Login Successful!',
            type: SUCCESS,
          }),
        )
      }).catch(() => {
        console.log('errors')
        setLoading(false)
      })
    }
    // setLoading(false)
  }
  const handleClickShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }
  // if(isLoading){
  //   return <Loader/>
  // }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toastify isShow={success} message="Login successfully done." />
      <img
        src={logo}
        style={{
          position: 'absolute',
          left: '50px',
          top: '50px',
        }}
      />
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isSmallScreen ? '16px' : '0',
          }}
        >
          <Card
            sx={{
              boxShadow: 'none',
              width: '100%',
              maxWidth: '370px',
              margin: isSmallScreen ? '16px' : '0',
            }}
          >
            <Typography
              variant="h1"
              fontSize={32}
              textAlign="center"
              fontWeight="bold"
              color={'#0E141F'}
            >
              Welcome
            </Typography>
            <Typography
              variant="h6"
              fontSize={12}
              textAlign="center"
              color={'#999999'}
            >
              Please log in to access your personalized dashboard and continue
              where you left off.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <InputField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                error={!!userInfoError.email}
                helperText={userInfoError.email}
              />
              <InputField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!userInfoError.password}
                helperText={userInfoError.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error">{error}</Alert>}

              <FormControlLabel
                control={
                  <Checkbox value="remember" sx={{ color: '#9B9B9C' }} />
                }
                label="Remember me"
                sx={{ color: '#9B9B9C' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  boxShadow: 'none',
                  bgcolor: '#EA244E',
                  borderRadius: '8px',
                  padding: '15px 0px',
                }}
              >
                {isLoading ? <CircularProgress size={'20px'} sx={{color:"white"}} /> : 'Log In'}
                
                {/* <CircularProgress  /> */}
              </Button>
            </Box>
          </Card>
          {/* <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, boxShadow: 'none', bgcolor: '#EA244E', borderRadius: '8px', padding: '15px 0px' }}
              
              >
                logout
              </Button> */}
        </Grid>
        {!isSmallScreen && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${login_bg})`,
              backgroundSize: 'cover',
            }}
          />
        )}
      </Grid>
    </Box>
  )
}
