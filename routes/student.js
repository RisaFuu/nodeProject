module.exports = {
    addStudentPage: (req, res) => {
        res.render('add-student.ejs');
    },
    addStudent: (req, res) => {
        console.log(req.body)
        // console.log("Add Student Form ", req.body);
        // 1. Store info   in variables 
        // 1. if Student Exists dont enter the record 
        // use Student username as unique 

        // 2. prepare a sql query to insert into the records
        // 3.  execute it

        // 4. redirect to home page 
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let phone = req.body.phone;
        let address = req.body.address;
        let notes = req.body.notes;
        let itemPurchased = req.body.itemPurchased;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let message = '';

        // const {
        //     first_name,
        //     last_name,
        //     email,
        //     phone,
        //     address,
        //     notes,
        //     itemPurchased,
        //     quantity,
        //     price,
        //     message,
        //     image
        // } = req.body;

        // let uploadedFile = req.files.student_image;
        // let image_name = uploadedFile.name;
        // let fileExtension = uploadedFile.mimetype.split('/')[1];
        // let student_image_name = user_name + "." + fileExtension;



        // console.log(" fileExtension ", fileExtension);
        // console.log(" image_name", image_name);

        // console.log('student_image_name', student_image_name);

        // search for the user which we got from the form and check it with all the users in the database if match tell the user that user exists  else then we can proceed to add a record.

        let first_nameQuery = "SELECT * FROM information WHERE first_name  = '" + first_name + "'";
        db.query(first_nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                console.log(" user existsss")

                message = 'The firstname you trying to add Already Exists';
                // res.render('add-students.ejs', { message });

            } else {
                console.log(" user does not  existsss")

                // check for the acceptable file extension and they are 
                //  jpg , png git 
                // let user_name = req.body.user_name;
                let query = "INSERT INTO `information` (first_name,last_name, email, phone, address, notes, itemPurchased, quantity, price) values('" + first_name + "','"
                    + last_name + "','" + email + "','" + phone + "','" + address + "','" + notes + "','" + itemPurchased + "','" + quantity + "','" + price + "')";
                console.log(" query ", query);

                // "INSERT INTO `students` (first_name,last_name,user_name, number, course, image) values('lkjlkjl,kjlkj,lkj,lkj,Web Developer,lkj.jpeg')

                db.query(query, (err, response) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                })

                return;
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/images   /${student_image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // let user_name = req.body.user_name;
                        let query = "INSERT INTO `information` (first_name,last_name, email, phone, address, notes, itemPurchased, quantity, price) values('" + first_name + "','"
                            + last_name + "','" + email + "','" + phone + "','" + address + "','" + notes + "','" + itemPurchased + "','" + quantity + "','" + price + "')";
                        console.log(" query ", query);

                        // "INSERT INTO `students` (first_name,last_name,user_name, number, course, image) values('lkjlkjl,kjlkj,lkj,lkj,Web Developer,lkj.jpeg')

                        db.query(query, (err, response) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        })
                    })

                } else {

                }

            }



        });




    },
    // open Edit page when we click on the edit button 
    editStudentPage: (req, res) => {

        let studentId = req.params.id;

        // Create a edit page form 
        // run sql to populate it // get the particular record using the id 

        let query = "SELECT * from `information` WHERE id='" + req.params.id + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(" data !!!", result[0]);

            res.render('edit-student.ejs', { information: result[0] });

        });







    },
    editStudent: (req, res) => {
        // console.log(" update page id", req.params);
        // console.log(" update page data", req.body);
        let informationId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let phone = req.body.phone;
        let address = req.body.address;
        let notes = req.body.notes;
        let itemPurchased = req.body.itemPurchased;
        let quantity = req.body.quantity;
        let price = req.body.price;

        // let query = "UPDATE `students` SET `first_name`='" + first_name + "'`, `last_name`='" + last_name + "', `course`='" + course + "', `number`='" + number + "' WHERE `id`='" + studentId + "'";
        let query = "UPDATE `information` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `email` = '" + email + "', `phone` = '" + phone + "', `address` = '" + address + "', `notes` = '" + notes + "',`itemPurchased` = '" + itemPurchased + "',`quantity` = '" + quantity + "',`price` = '" + price + "'WHERE `id` = '" + informationId + "'";

        // console.log(" query ", query);

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(" data !!!", result[0]);

            res.redirect('/');

        });

    },

    // deleteStudent:(req,res) =>{
    //     let query = "DELETE FROM information WHERE id = informationId";
    // }

}
