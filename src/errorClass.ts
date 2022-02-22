class CustomError {
    
    code : number;
    message : string;

    constructor(code: number, message: string) {
       this.message = message;
       this.code = code;
    }

    static notFound() {
        return new CustomError(404, "Page Not Found")
    } 

    static Unauthorized(){
        return new CustomError(401, "Authentication Error");
    }

    static Forbidden(){
        return new CustomError(403, "You do not have sufficient permissions to read the file");
    }

    static serverError(){
        return new CustomError(500, "Internal Server Error");
    }

    static viewError() {
        return '';
    }
}

module.exports = CustomError;