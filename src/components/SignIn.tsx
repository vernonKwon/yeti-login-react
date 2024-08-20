import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRive, useStateMachineInput } from 'rive-react'
import { useEffect, useState, useCallback, FormEvent, FC } from 'react'

interface Props {
  checkLogin: (user: string, pass: string) => boolean
}

const theme = createTheme()

const STATE_MACHINE_NAME = 'State Machine 1'

const SignIn: FC<Props> = ({ checkLogin }) => {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { rive, RiveComponent } = useRive({
    src: '520-990-teddy-login-screen.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  })

  const stateSuccess = useStateMachineInput(rive, STATE_MACHINE_NAME, 'success')
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fail')
  const stateHandUp = useStateMachineInput(rive, STATE_MACHINE_NAME, 'hands_up')

  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Check')
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Look')

  const triggerSuccess = useCallback(
    () => stateSuccess && stateSuccess.fire(),
    [stateSuccess]
  )
  const triggerFail = useCallback(
    () => stateFail && stateFail.fire(),
    [stateFail]
  )

  const setHangUp = useCallback(
    (hangUp: boolean) => stateHandUp && (stateHandUp.value = hangUp),
    [stateHandUp]
  )

  const setCheck = useCallback(
    (check: boolean) => {
      if (stateCheck) stateCheck.value = check
    },
    [stateCheck]
  )

  const setLook = useCallback(() => {
    if (!stateLook || !stateCheck || !setHangUp) return

    setHangUp(false)
    setCheck(true)
    let nbChars = 0
    nbChars = user.split('').length

    const ratio = nbChars / 41

    const lookToSet = ratio * 100 - 25

    stateLook.value = Math.round(lookToSet)
  }, [setCheck, setHangUp, stateCheck, stateLook, user])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  useEffect(() => {
    setLook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <RiveComponent
              style={{ width: '400px', height: '400px' }}
              // src="520-990-teddy-login-screen.riv"
            />
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <form autoComplete="off">
              <TextField
                onFocus={() => setHangUp(false)}
                onChange={(event) => setUser(event.target.value)}
                value={user}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(event) => {
                  setHangUp(true)
                  setPassword(event.target.value)
                }}
                onFocus={() => setHangUp(true)}
                //onE
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </form>
            <Button
              onMouseOver={() => setHangUp(false)}
              onFocus={() => setHangUp(false)}
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                setCheck(true)
                if (checkLogin(user, password)) triggerSuccess()
                else triggerFail()
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignIn
