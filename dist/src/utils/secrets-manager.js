"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminUIDs = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const config_1 = require("@nestjs/config");
const cache_manager_utils_1 = require("./cache-manager.utils");
const getConfig = () => {
    const configService = new config_1.ConfigService();
    const ADMIN_UID_SECRET_NAME = configService.get('ADMIN_UID_SECRET_NAME');
    const ADMIN_UID_SECRET_KEY = configService.get('ADMIN_UID_SECRET_KEY');
    const AWS_REGION = configService.get('AWS_REGION');
    const ACCESS_KEY = configService.get('ACCESS_KEY');
    const SECRET_KEY = configService.get('SECRET_KEY');
    return {
        ADMIN_UID_SECRET_NAME,
        ADMIN_UID_SECRET_KEY,
        AWS_REGION,
        ACCESS_KEY,
        SECRET_KEY,
    };
};
const secretManagerClient = () => {
    const { AWS_REGION, ACCESS_KEY, SECRET_KEY } = getConfig();
    return new client_secrets_manager_1.SecretsManagerClient({
        region: AWS_REGION,
        credentials: {
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
        },
    });
};
const getAdminUIDs = async () => {
    const { ADMIN_UID_SECRET_NAME, ADMIN_UID_SECRET_KEY } = getConfig();
    const UIDsFromCache = cache_manager_utils_1.CacheManager['1HourCache'].get(`${ADMIN_UID_SECRET_NAME}/${ADMIN_UID_SECRET_KEY}`);
    if (UIDsFromCache) {
        return UIDsFromCache;
    }
    try {
        const client = secretManagerClient();
        const response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: ADMIN_UID_SECRET_NAME,
        }));
        const obj = JSON.parse(response.SecretString);
        const secretValue = obj[ADMIN_UID_SECRET_KEY];
        cache_manager_utils_1.CacheManager['1HourCache'].put(`${ADMIN_UID_SECRET_NAME}/${ADMIN_UID_SECRET_KEY}`, secretValue);
        return secretValue;
    }
    catch (error) {
        throw error;
    }
};
exports.getAdminUIDs = getAdminUIDs;
//# sourceMappingURL=secrets-manager.js.map