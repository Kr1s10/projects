import BASE_URL from '../types/constants';
import { TStatus } from '../types/interfaces';
import makeURLwithQuery from './MakeURLwithQuery';

class EngineServise {
  private static URL = new URL('engine', BASE_URL);

  public static engine = async (id: number, status: TStatus) => {
    const url = makeURLwithQuery(EngineServise.URL, { id, status });
    const res = await fetch(url.href);

    return status === 'drive' && res.status !== 200
      ? { success: false }
      : { ...(await res.json()) };
  };
}

export default EngineServise;
