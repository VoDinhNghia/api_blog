const crypto = require('crypto');

let CryptoPass = function(PassWord) {
    const cipher = crypto.createCipher('aes128', '**********');
    var password = cipher.update(PassWord, 'utf8', 'hex');
    password += cipher.final('hex');
    return password
}

let DicipherPass = function(PassWord) {
    const decipher = crypto.createDecipher('aes128', '*********');
    var decrypted = decipher.update(PassWord, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}

let ReplaceCharScriptFromForm = function(stringInput) {
    let newString1 = '';
    let newString2 = '';
    if (stringInput.indexOf('<script>') != -1 || stringInput.indexOf('</script>') != -1) {
        newString1 = stringInput.replace('<script>', '%2rip%2');
        newString2 = newString1.replace('</script>', '%2rip%2:))');
        return newString2
    } else {
        return stringInput
    }
}

module.exports = {
    CryptoPass: CryptoPass,
    DicipherPass: DicipherPass,
    ReplaceCharScriptFromForm: ReplaceCharScriptFromForm
}
