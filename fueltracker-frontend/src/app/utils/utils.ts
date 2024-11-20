export class Utils {

    static formatKilometersValue(kilometers: string) {
        if (!kilometers) {
          return '';
        }
    
        const dotIndex: number = kilometers.indexOf('.');
        if (dotIndex == -1) {
          return kilometers;
        }
    
        return kilometers.substring(0, (dotIndex + 3)).replace('.', ',');
    }
}