import type { AbstractPowerSyncDatabase, CrudEntry, PowerSyncBackendConnector } from '@powersync/web';
import { supabase } from './supabase';

export class PowerSyncConnector implements PowerSyncBackendConnector {
  async fetchCredentials() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return {
      endpoint: 'https://v9e5a9j89hrk.share.zrok.io',
      token: session.access_token,
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    try {
      for (const op of transaction.crud) {
        const table = supabase.from(op.table);
        
        switch (op.op) {
          case 'put':
            await table.upsert({ ...op.opData, id: op.id });
            break;
          case 'patch':
            await table.update(op.opData).eq('id', op.id);
            break;
          case 'delete':
            await table.delete().eq('id', op.id);
            break;
        }
      }
      await transaction.complete();
    } catch (ex) {
      console.error('Error uploading data to Supabase:', ex);
      // Wait for the next sync interval to retry
    }
  }
}
