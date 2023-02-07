import { TextField, Button } from '@mui/material';

export const Login = () => {
    const formSpacing = {
        marginTop: 200,
    }
    return (
        <div>
            <form style={formSpacing}>
            <TextField
                label="Enter UFL Email"
                id="UFL_email"
                variant="filled"
                size="small"
                />
                <br/><br/>
                <TextField
                label="Enter Password"
                id="password"
                size="small"
                variant="filled"
                />
                <br/><br/>
            <Button variant="contained">Log In</Button>
        </form>
        </div>
    )
}