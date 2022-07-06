const fs = require('fs');

function scaner(mainPath){
    let y1 = fs.readdirSync(mainPath);
    for(let x of y1){
        let stat = fs.statSync(mainPath + x);
        let json = {}
        if(!stat.isFile()){
            let path = mainPath + x + '/';
           
            json.path = path;
            json.numberOfFile = fs.readdirSync(path).length
            json.numberOfDir = getDirectories(path).length
            
            fs.writeFile(path + 'info.json', JSON.stringify(json), (err, data) => {
                if(err) console.log(err)
            })
            scaner(path);
        }
    }
}

const getDirectories = path => 
    fs.readdirSync(path, { withFileTypes: true })
    .filter(dir => dir.isDirectory())


scaner('./');
console.log('Done')