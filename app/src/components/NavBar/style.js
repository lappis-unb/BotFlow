import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    }
}));

export const FirstButton = styled(Button)`
    margin-left: 10% !important;
`