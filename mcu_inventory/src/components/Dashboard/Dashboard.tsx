import React, { useState } from 'react';
import { Drawer as MUIDrawer, 
    ListItem, 
    List, 
    ListItemIcon, 
    ListItemText, 
    Theme, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Divider, 
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { makeStyles, createStyles, useTheme} from '@mui/styles'
import MenuIcon from  '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx'
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { DataTable, HeroForm } from '../../components'

const drawerWidth = 240;

const useStyles = (makeStyles(( theme: Theme ) => 
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            // transition: theme.transitions.create(['margin', 'width'], {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.leavingScreen
            // }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            // transition: theme.transitions.create(['margin', 'width'], {
            //     easing: theme.transitions.easing.easeOut,
            //     duration: theme.transitions.duration.enteringScreen
            // }),
        },
        menuButton: {
            // marginRight: theme.spacing(2)
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            // padding: theme.spacing(0,1),
            // ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        content: {
            flexGrow: 1,
            padding: 100,
            // transition: theme.transitions.create('margin', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.leavingScreen
            // }),
            marginLeft: -drawerWidth
        },
        contentShift: {
            // transition: theme.transitions.create('margin', {
            //     easing: theme.transitions.easing.easeOut,
            //     duration: theme.transitions.duration.enteringScreen
            // }),
            marginLeft: 0
        },
        toolbar: {
            display: 'flex'
        },
        toolbar_button: {
            marginLeft: 'auto'
        }
    })
))

interface DashProps{
    history: RouteComponentProps['history'],
    location: RouteComponentProps['location'],
    match: RouteComponentProps['match']
}

export const Dashboard = withRouter(( props: DashProps ) => {
    console.log(props)
    const { history } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }
    
    const handleDrawerClose = () => {
        setOpen(false);
    }
    // Handle Dialog Open/Close
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const itemList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'Sign in',
            onClick: () => history.push('/signin')
        }
    ]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })} >
                <Toolbar className={classes.toolbar}>
                    <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        Dashboard
                    </Typography>
                    <Button className={classes.toolbar_button} onClick={handleDialogClickOpen} style={ {backgroundColor: 'whitesmoke', marginLeft: 'auto'} }>
                        Create new Hero
                    </Button>

                    {/*Dialog Pop Up begin */}
                    <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new Hero</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Add a New Hero</DialogContentText>
                        <HeroForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleDialogClickClose} color="primary">Cancel</Button>
                        <Button onClick={handleDialogClickClose} color = "primary">Done</Button> 
                    </DialogActions>
                    </Dialog>

                </Toolbar>
            </AppBar>
            <MUIDrawer className={classes.drawer} variant='persistent' anchor='left' open={open} classes={{
                paper: classes.drawerPaper
            }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> } */}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemList.map((item, index) => {
                        const {text, onClick } = item;
                        return(
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })}
                </List>
            </MUIDrawer>

            <main className={clsx(classes.content, {
                [classes.contentShift]: open
            })}>
                <div className={classes.drawerHeader} />
       
                <DataTable/>
            </main>
        </div>
    )
})