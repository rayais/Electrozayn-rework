const sessionContrller=require('../controllers/session')
module.exports={
    CreateSession: async (req, res, user_id, session) => {
        try {
            const result = await sessionContrller.post(user_id, session);
            const registerInfo = {
                user_id: result.user_id,
                session: result.session,
            };

            res.cookie("Electrozyne", session, {
                path: '/',
                expires: new Date(new Date().getTime() + 86400 * 1000),
                httpOnly: false,
                Electrozyne: false
            }).json({ session, success: true, user_id});
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },
    VerifySession:(req,res,next)=>{
        if(req.cookies.Electrozyne){
            sessionContrller.Get(req.cookies.Electrozyne)
            .then((result)=>{
                if(result.length>0&&(result[0].date>Date.now())){
                    var registerInfo={
                        user_id:result[0].user_id,
                        session:result[0].session,
                    }
                    res.status(201).send(registerInfo)
                }else{
                    res.status(400).send('seesion login fail')
                }
            })
            .catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(400).send('session login fail')
        }
    }
}