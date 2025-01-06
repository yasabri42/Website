import os
import hvac

def get_vault_secret(key, vault_url=os.getenv('VAULT_ADDR'), token=os.getenv('VAULT_TOKEN')):
    client = hvac.Client(url=vault_url, token=token)
    if client.is_authenticated():
        secret = client.secrets.kv.v2.read_secret_version(path=os.getenv('VAULT_PATH'), mount_point=os.getenv('VAULT_MOUNT'))
        return secret['data']['data'].get(key)
    else:
        raise Exception("Vault authentication failed")