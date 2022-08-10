import {
  BASE_URL, HTTPStatusCodes, Method, Page, StatusEngine,
} from '../types/constants';
import { TStatus } from '../types/interfaces';
import makeURLwithQuery from '../components/helpers/MakeURLwithQuery';

class EngineServise {
  private static URL = new URL(Page.engine, BASE_URL);

  public static engine = async (id: number, status: TStatus) => {
    const url = makeURLwithQuery(this.URL, { id, status });
    const res = await fetch(url.href, {
      method: Method.PATCH,
    });

    return status === StatusEngine.drive && res.status !== HTTPStatusCodes.OK
      ? { success: false }
      : { ...(await res.json()) };
  };
}

export default EngineServise;
