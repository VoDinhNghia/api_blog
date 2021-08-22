const crypto = require('crypto');

let CryptoPass = function(PassWord) {
    const cipher = crypto.createCipher('aes128', 'blog api @12N');
    var password = cipher.update(PassWord, 'utf8', 'hex');
    password += cipher.final('hex');
    return password
}

let DicipherPass = function(PassWord) {
    const decipher = crypto.createDecipher('aes128', 'blog api @12N');
    var decrypted = decipher.update(PassWord, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}

let ReplaceCharScriptFromForm = function(str_input) {
    let new_str = '';
    let new_str2 = '';
    if (str_input.indexOf('<script>') != -1 || str_input.indexOf('</script>') != -1) {
        new_str = str_input.replace('<script>', '%2rip%2');
        new_str2 = new_str.replace('</script>', '%2rip%2:))');
        return new_str2
    } else {
        return str_input
    }
}

module.exports = {
    CryptoPass: CryptoPass,
    DicipherPass: DicipherPass,
    ReplaceCharScriptFromForm: ReplaceCharScriptFromForm
}