import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import validate from 'validate.js';
import {
    Button, CardContent,
    Divider, Grid, TextField, makeStyles
} from '@material-ui/core';
import BookService from '../../services/book.service';
import LocationService from '../../services/location.service';


const schema = {
    volumeNumber: {
        presence: { allowEmpty: false, message: 'Campo requerido' },
        length: {
            maximum: 50,
            message: 'Máximo 50 caractéres permitidos'
        }
    },
    title: {
        presence: { allowEmpty: false, message: 'Campo requerido' },
        length: {
            maximum: 50,
            message: 'Máximo 50 caractéres permitidos'
        }
    },
};


const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    }
}));

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isFormValuesEdit, setIsFormValuesEdit] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    const [values, setValues] = useState({
        idBook: '',
        volumeNumber: '',
        title: ''
    });

    const [locations, setLocations] = useState([]);
    const [locationSelected, setLocationSelected] = useState([]);

    useEffect(() => {
        LocationService.get()
            .then(response => {
                    setLocations(response.data);
            })
    },[])

    const getLocation = (event, value) => {
        if (value !== null) {
            setLocationSelected(value);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [name]: value
            },
            touched: {
                ...formState.touched,
                [name]: true
            }
        }));

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    //Validate fields
    useEffect(() => {
        const errors = validate(formState.values, schema, { fullMessages: false });

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

    //validate if form has errors
    useEffect(() => {
        let isValid = Object.keys(formState.errors).length === 0 && formState.errors.constructor === Object;
        setIsValidForm(isValid);
    }, [formState.errors]);

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;


    //SAVE
    const saveReport = (e) => {
        e.preventDefault();

        values.locationViewModel = { id: locationSelected.id };

        var bookViewModel = JSON.stringify(values);

        if (isValidForm) {
            if (isEditForm) {
                BookService.edit(bookViewModel)
                    .then(response => {
                        if (response.status === 200) {
                            setOpen(false);
                        }
                    })
                    .catch(e => {
                       
                    });
            } else {
                BookService.create(bookViewModel)
                    .then(response => {
                        alert('created')
                        setOpen(false);
                    })
                    .catch(e => {
                       
                    });
            }
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                AGREGAR NUEVO LIBRO
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">NUEVO LIBRO</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Completar los siguientes campos.
                    </DialogContentText>
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Autocomplete
                                    id="combo-box-demo"
                                    margin="dense"
                                    options={locations}
                                    onChange={getLocation}
                                    getOptionLabel={(option) => option.shelf + ' - '+ option.room}
                                    style={{ width: 150 }}
                                    value={locationSelected}
                                    name="idLocation"
                                    renderInput={(params) =>
                                        <TextField {...params} label="Localización..." variant="outlined" />}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Número de Volumen"
                                    name="volumeNumber"
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    error={hasError('volumeNumber') || (isFormValuesEdit && formState.errors.hasOwnProperty('volumeNumber'))}
                                    value={formState.values.volumeNumber || values.volumeNumber}
                                    helperText={
                                        (hasError('volumeNumber') ? formState.errors.volumeNumber[0] : null) ||
                                        ((isFormValuesEdit && formState.errors.volumeNumber) ? formState.errors.volumeNumber[0] : null)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Título"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    error={hasError('title') || (isFormValuesEdit && formState.errors.hasOwnProperty('title'))}
                                    value={formState.values.title || values.title}
                                    helperText={
                                        (hasError('title') ? formState.errors.title[0] : null) ||
                                        ((isFormValuesEdit && formState.errors.title) ? formState.errors.title[0] : null)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={saveReport}
                        disabled={!isValidForm}
                    >
                        {isEditForm ? 'EDITAR' : 'GUARDAR'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

