const pool = require('../database');
const moment = require('moment');
const { adelanto } = require('../config');
const registro = {};
//funcion para registrar un docente en un determinado dia
registro.registrar = async (date, time, profesorID, image) => {
    const rows = await pool.query('SELECT * FROM asignacion WHERE profesorID = ?',[profesorID]);
    if(rows.length>0){
        for(let row of rows){
            var tiempo =  moment(time,"HH:mm:ss").add(adelanto, 'm');
            if(moment(date,"YYYY-MM-DD").isSameOrBefore(row.fechaFin) && moment(date,"YYYY-MM-DD").isSameOrAfter(row.fechaInicio)){
                if(moment(tiempo).isSameOrBefore(moment(row.horaFin,"HH:mm:ss")) && moment(tiempo).isSameOrAfter(moment(row.horaInicio,"HH:mm:ss"))){
                    if(row.estado){
                        var fechaRegistro = date+" "+time;
                        var asignacionID = row.asignacionID
                        const newReg = {
                            asignacionID,
                            fechaRegistro
                        }
                        const verification = await pool.query('SELECT * FROM registro WHERE DATE(fechaRegistro) = ? AND asignacionID = ?',[date,row.asignacionID]);
                        if(verification.length == 0){
                            const result = await pool.query('INSERT INTO registro set ?', [newReg]);
                            const res = await pool.query('SELECT * FROM registro WHERE fechaRegistro = ? and asignacionID = ?',[fechaRegistro,row.asignacionID]);
                            require("fs").writeFile("/registerUI/src/assets/images/"+res[0].registroID+".jpg", image, 'base64', function(err) {
                                console.log(err);
                            });
                            return res[0].registroID;
                        }else return "ya existe el registro "+verification[0].registroID;
                    }
                }
            }
        }
        return "no existe asignacion";
    }
    else{
        return "no existe asignacion";
    }
};

module.exports = registro;