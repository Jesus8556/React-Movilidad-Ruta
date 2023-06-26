import Layout from "../components/layout"
import { useState, useEffect } from "react"
import axios, { Axios } from "axios"

function Movilidad() {
    const [colegios, setColegios] = useState([])
    const [movilidades, setMovilidades] = useState([])
    const [apoderados,setApoderados] = useState([])
    const [grados,setGrados] = useState([])
    const [vehiculos,setVehiculos] = useState([])
    const [alumnos,setAlumnos] = useState([])
    const [id, setId] = useState(null)
    const [servicio, setServicio] = useState('')
    const [turno, setTurno] = useState('')
    const [seccion, setSeccion] = useState('')
    const [docente, setDocente] = useState('')
    const [pago, setPago] = useState(0)
    const [colegio, setColegio] = useState(0)
    const [apoderado, setApoderado] = useState(0)
    const [grado, setGrado] = useState(0)
    const [vehiculo, setVehiculo] = useState(0)
    const [alumno, setAlumno] = useState(0)
    const [bandera, setBandera] = useState(false)

    const apiMovilidad = 'http://127.0.0.1:8000/api/movilidad/'
    const apiColegio = 'http://127.0.0.1:8000/api/colegio/'
    const apiApoderado = 'http://127.0.0.1:8000/api/apoderado/'
    const apiGrado = 'http://127.0.0.1:8000/api/grado/'
    const apiVehiculo = 'http://127.0.0.1:8000/api/vehiculo/'
    const apiAlumno = 'http://127.0.0.1:8000/api/alumno/'

    useEffect(() => {
        axios.get(apiMovilidad)
            .then(res => {
                console.log(res.data);
                setMovilidades(res.data);
                setBandera(false)
            })
    }, [bandera])
    useEffect(() => {
        axios.get(apiColegio)
            .then(res => {
                console.log(res.data);
                setColegios(res.data);
                setBandera(false)
            })
    }, [bandera])
    useEffect(() => {
        axios.get(apiApoderado)
            .then(res => {
                console.log(res.data);
                setApoderados(res.data);
                setBandera(false)
            })
    }, [bandera])
    useEffect(() => {
        axios.get(apiGrado)
            .then(res => {
                console.log(res.data);
                setGrados(res.data);
                setBandera(false)
            })
    }, [bandera])
    useEffect(() => {
        axios.get(apiVehiculo)
            .then(res => {
                console.log(res.data);
                setVehiculos(res.data);
                setBandera(false)
            })
    }, [bandera])
    useEffect(() => {
        axios.get(apiAlumno)
            .then(res => {
                console.log(res.data);
                setAlumnos(res.data);
                setBandera(false)
            })
    }, [bandera])

    function mostrar(cod) {
        console.log("mostrando codigo" + cod)
        axios.get(apiMovilidad + cod)
            .then(res => {
                setId(res.data.movilidad_id)
                setServicio(res.data.movilidad_tipo_servicio)
                setTurno(res.data.movilidad_turno)
                setSeccion(res.data.movilidad_seccion)
                setDocente(res.data.movilidad_docente)
                setPago(res.data.movilidad_pago)
                setColegio(res.data.colegio)
                setApoderado(res.data.apoderado)
                setGrado(res.data.grado)
                setVehiculo(res.data.vehiculo)
                setAlumno(res.data.alumno)
            })
    }

    function guardar(e) {
        e.preventDefault()
        let cod = id
        let datos = {
            movilidad_tipo_servicio: servicio,
            movilidad_turno: turno,
            movilidad_seccion: seccion,
            movilidad_docente: docente,
            movilidad_pago: pago,
            colegio: colegio,
            apoderado: apoderado,
            grado: grado,
            vehiculo: vehiculo,
            alumno: alumno
        }
        if (cod > 0) {
            //actualizar
            axios.put(apiMovilidad + cod + "/", datos)
                .then(res => {
                    console.log(res.data)
                    setBandera(true)
                    setServicio('')
                    setTurno('')
                    setSeccion('')
                    setDocente('')
                    setPago(0)
                    setColegio(0)
                    setApoderado(0)
                    setGrado(0)
                    setVehiculo(0)
                    setAlumno(0)
                    setId(null)
                }).catch((error) => {
                    console.log(error.toString())
                })

        }
        else {
            axios.post(apiMovilidad, datos)
                .then(res => {
                    console.log(res.data)
                    setBandera(true)
                    setServicio('')
                    setTurno('')
                    setSeccion('')
                    setDocente('')
                    setPago(0)
                    setColegio(0)
                    setApoderado(0)
                    setGrado(0)
                    setVehiculo(0)
                    setAlumno(0)
                    setId(null)

                }).catch((error) => {
                    console.log(error.toString())
                })
        }
    }
    function eliminar(cod) {
        let rpta = window.confirm("desea eliminar")
        if (rpta) {
            axios.delete(apiMovilidad + cod + "/")
                .then(res => {
                    console.log(res.data)
                    setBandera(true)

                })

        }
    }



    return (
        <Layout>
            <>
                <h1>Movilidades</h1>
                <div className="container-fluid">
                    <form onSubmit={guardar}>
                        <div className="mb-3">
                            <label className="form-label">Nuevo Servicio</label>
                            <input type="hidden" value={id} />
                            <input type="text" className="form-control" id="servicio" value={servicio} onChange={(e) => setServicio(e.target.value)}
                            />
                            <br />
                            <label className="form-label">Nuevo turno</label>
                            <input type="text" className="form-control" id="turno" value={turno} onChange={(e) => setTurno(e.target.value)}
                            />
                            <br />
                            <label className="form-label">Nueva seccion</label>
                            <input type="text" className="form-control" id="seccion" value={seccion} onChange={(e) => setSeccion(e.target.value)}
                            />
                            <br />
                            <label className="form-label">Docente Encargado</label>
                            <input type="text" className="form-control" id="docente" value={docente} onChange={(e) => setDocente(e.target.value)}
                            />
                            <br />
                            <label className="form-label">Pago</label>
                            <input type="number" className="form-control" id="pago" value={pago} onChange={(e) => setPago(e.target.value)}
                            />
                            <br />
                            <label className="form-label">Seleccionar Colegio</label>
                            <select className="form-select" id="colegio" value={colegio} onChange={(e) => setColegio(e.target.value)} >
                            <option value="">Selecciona un colegio</option>
                                {colegios.map((par,index) => {
                                    return (
                                        <option key={par.colegio_id} value={par.colegio_id}>
                                            
                                            {par.colegio_nombre}
                                        </option>
                                    )
                                })}
                            </select>
                            <br />
                            <label className="form-label">Seleccionar Apoderado</label>
                            <select className="form-select" id="apoderado" value={apoderado} onChange={(e) => setApoderado(e.target.value)} >
                            <option value="">Selecciona un apoderado</option>
                                {apoderados.map((par,index) => {
                                    return (
                                        <option key={par.apoderado_id} value={par.apoderado_id}>
                                            
                                            {par.apoderado_nombre}
                                        </option>
                                    )
                                })}
                            </select>
                            <br />
                            <label className="form-label">Seleccionar Grado</label>
                            <select className="form-select" id="grado" value={grado} onChange={(e) => setGrado(e.target.value)} >
                            <option value="">Selecciona un grado</option>
                                {grados.map((par,index) => {
                                    return (
                                        <option key={par.grado_id} value={par.grado_id}>
                                            
                                            {par.grado_nombre}
                                        </option>
                                    )
                                })}
                            </select>
                            <br />
                            <label className="form-label">Seleccionar Placa de vehiculo</label>
                            <select className="form-select" id="vehiculo" value={vehiculo} onChange={(e) => setVehiculo(e.target.value)} >
                            <option value="">Selecciona el vehiculo</option>
                                {vehiculos.map((par,index) => {
                                    return (
                                        <option key={par.vehiculo_id} value={par.vehiculo_id}>
                                            
                                            {par.vehiculo_marca}
                                        </option>
                                    )
                                })}
                            </select>
                            <br />
                            <label className="form-label">Seleccionar Alumnos</label>
                            <select className="form-select" id="alumno" value={alumno} onChange={(e) => setAlumno(e.target.value)} >
                                <option value="">Selecciona un alumno</option>
                                {alumnos.map((par,index) => {
                                    return (
                                        <option key={par.alumno_id} value={par.alumno_id}>
                                            
                                            {par.alumno_nombre}
                                        </option>
                                    )
                                })}
                            </select>
                            <br />
                            

                            
    


                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>

                    </form>

                </div>


                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>#</th>
                            <th style={{ textAlign: 'center' }}>Tipo de Servicio</th>
                            <th style={{ textAlign: 'center' }}>Turno</th>
                            <th style={{ textAlign: 'center' }}>Seccion</th>
                            <th style={{ textAlign: 'center' }}>Docente</th>
                            <th style={{ textAlign: 'center' }}>Pago</th>
                            <th style={{ textAlign: 'center' }} >Nombre del Colegio</th>
                            <th style={{ textAlign: 'center' }}>Nombre del apoderado</th>
                            <th style={{ textAlign: 'center' }}>Grado</th>
                            <th style={{ textAlign: 'center' }}>Marca de Vehiculo</th>
                            <th style={{ textAlign: 'center' }}>Nombre del alumno</th>
                            <th style={{ textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movilidades.map((par) => {
                            return (
                                <tr>
                                    <th scope="row" key={par.id}>{par.movilidad_id}</th>
                                    <td style={{ textAlign: 'center' }}>{par.movilidad_tipo_servicio}</td>
                                    <td style={{ textAlign: 'center' }}>{par.movilidad_turno}</td>
                                    <td style={{ textAlign: 'center' }}>{par.movilidad_seccion}</td>
                                    <td style={{ textAlign: 'center' }}>{par.movilidad_docente}</td>
                                    <td style={{ textAlign: 'center' }}>S/.{par.movilidad_pago}</td>
                                    <td style={{ textAlign: 'center' }}>{par.colegio_nombre}</td>
                                    <td style={{ textAlign: 'center' }}>{par.apoderado_nombre}</td>
                                    <td style={{ textAlign: 'center' }}>{par.grado_nombre}</td>
                                    <td style={{ textAlign: 'center' }}>{par.vehiculo_marca}</td>
                                    <td style={{ textAlign: 'center' }}>{par.alumno_nombre}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button"
                                            className="btn btn-primary"
                                            onClick={() => mostrar(par.movilidad_id)}
                                        >Editar</button>
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => eliminar(par.movilidad_id)}
                                        >Eliminar</button>
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </>

        </Layout>

    )


}
export default Movilidad