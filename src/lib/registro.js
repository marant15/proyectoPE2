const pool = require('../database');
const moment = require('moment');
const registro = {};

registro.registrar = async (date, time, profesorID) => {
    const rows = await pool.query('SELECT * FROM asignacion WHERE profesorID = ?',[profesorID]);
    if(rows.length>0){
        for(let row of rows){
            var tiempo =  moment(time,"HH:mm:ss").add(20, 'm');
            if(moment(date,"YYYY-MM-DD").isSameOrBefore(row.fechaFin) && moment(date,"YYYY-MM-DD").isSameOrAfter(row.fechaInicio)){
                if(moment(tiempo).isSameOrBefore(moment(row.horaFin,"HH:mm:ss")) && moment(tiempo).isSameOrAfter(moment(row.horaInicio,"HH:mm:ss"))){
                    var fechaRegistro = date+" "+time;
                    var asignacionID = row.asignacionID
                    const newReg = {
                        asignacionID,
                        fechaRegistro
                    }
                    const result = await pool.query('INSERT INTO registro set ?', [newReg]);
                    const res = await pool.query('SELECT * FROM registro WHERE fechaRegistro = ? and asignacionID = ?',[fechaRegistro,row.asignacionID]);
                    return res[0].registroID;
                }
            }
        }
    }
    else{
        return 0;
    }
};

module.exports = registro;