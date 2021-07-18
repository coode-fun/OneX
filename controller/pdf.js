const Students=require('../models/students');

const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

exports.generatePDF = async ( request, res )=>{
    try{       
// console.log(req.body.studentId);
        // Students.find({_id:req.body.studentId},(err, student)=>{
            // if(err) throw error
            

            let resultPdf = null;
            let testIndex = null;

            // console.log(student);
            let codes = request.params.subjectTestCode.split('$');
            console.log(request.user);
            request.user.testCompleted.forEach( async (testMatched, index) => {
                console.log(codes[1], testMatched, index );
                console.log(codes[0]);
                if(testMatched.testCode == codes[1] && testMatched.subjectCode == codes[0]){
                    testIndex = index;
                    resultPdf = testMatched.result.pdf;
                    
                }
            })
            
            if(!resultPdf){ 
                let correctAnswer = request.user.testCompleted[testIndex].result.correctQuestions;
                let totalAnswers = request.user.testCompleted[testIndex].result.totalQuestions;
                let percentage = (correctAnswer/totalAnswers)*100;

                let documentDefinition = {
                    content: [
                        {
                            text: `${request.user.college}\n\n`,
                            style: 'header'
                        },
                        {
                            text: `Subject: ${request.user.testCompleted[testIndex].subjectName}\n\n`,
                            style: 'subheader'
                        },
                        {
                            text:`Student : ${request.user.name}\nTestId: ${request.user.testCompleted[testIndex].testCode}\nTotal number of Question: ${request.user.testCompleted[testIndex].result.totalQuestions}\nCorrect answers: ${request.user.testCompleted[testIndex].result.correctQuestions}\nWrong answers: ${totalAnswers - correctAnswer}\nTotal marks: ${request.user.testCompleted[testIndex].result.correctQuestions}\nPercentage: ${percentage}`,
                            style: ['quote', 'small']
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 19,
                            bold: true
                        },
                        subheader: {
                            fontSize: 15,
                            bold: true
                        },
                        quote: {
                            italics: true
                        },
                        small: {
                            fontSize: 13
                        }
                    }
                }

                const pdfDoc = pdfMake.createPdf(documentDefinition);
                pdfDoc.getBase64( async (data)=>{
                    // console.log(data);
                    request.user.testCompleted[testIndex].result.pdf = data;
                    await request.user.save();

                    res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition':'attachment;filename="result.pdf"'
                    });

                    let generatedPdf = Buffer.from(data.toString('utf-8'), 'base64');
            
                    res.end(generatedPdf);

                });
            }else{

                let pdfString = request.user.testCompleted[testIndex].result.pdf;
                console.log(pdfString)
                console.log('saved');
                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition':'attachment;filename="result.pdf"'
                });

                let generatedPdf = Buffer.from(pdfString.toString('utf-8'), 'base64');
                res.end(generatedPdf);
            }
        // })
    }
    catch(error){
        res.send({result:'error', message : error.message}); //----------------------------------render
    }
}