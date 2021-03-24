import { useQuery } from "react-query";
import { fromPairs } from 'lodash';
// Production
export const PROGRAM = 'yDuAzyqYABS';
export const ATTRIBUTE = 'sB1IHYu2xQT';
export const NAME_ATTRIBUTE = 'sB1IHYu2xQT';
export const PROGRAM_STAGE = 'a1jCssI2LkW';
// Localhost
// export const PROGRAM = 'IpHINAT79UW';
// export const ATTRIBUTE = 'TfdH5KvFmMy';
// export const NAME_ATTRIBUTE = 'w75KJ2mc4zz';
// export const PROGRAM_STAGE = 'A03MvHHogjR';

export function useInstances(d2: any, page: number, pageSize: number, query: string, ou: string, attribute: string) {
  const api = d2.Api.getApi();
  return useQuery<any, Error>(
    ['trackedEntityInstances', page, pageSize, query, ou, attribute],
    async () => {
      const params: any = {
        program: PROGRAM,
        ouMode: 'DESCENDANTS',
        ou,
        page,
        pageSize,
        totalPages: true,
        attribute: `${attribute}:LIKE:${query}`
      }
      return await api.get("trackedEntityInstances/query.json", params);
    },
    { retryDelay: 1000 }
  );
}

export function useTracker(d2: any, tei: string) {
  const api = d2.Api.getApi();
  return useQuery<any, Error>(
    ['trackedEntityInstances', tei],
    async () => {
      const params: any = {
        program: PROGRAM,
        attribute: ATTRIBUTE
      }
      const { attributes } = await api.get(`trackedEntityInstances/${tei}`, params);
      return fromPairs(attributes.map((a: any) => [a.attribute, a.value]))
    },
    { retryDelay: 1000 }
  );
}


export function useProgram(d2: any) {
  const api = d2.Api.getApi();
  return useQuery<any, Error>(
    'programs',
    async () => {
      const [{ programTrackedEntityAttributes }, organisationUnits] = await Promise.all([
        api.get(`programs/${PROGRAM}.json`, {
          fields: "programTrackedEntityAttributes[trackedEntityAttribute[id,name]]"
        }),
        d2.currentUser.getOrganisationUnits()
      ]);
      return {
        attributes: programTrackedEntityAttributes.map((a: any) => {
          return {
            id: a.trackedEntityAttribute.id,
            name: a.trackedEntityAttribute.name
          }
        }),
        units: organisationUnits.toArray().map((a: any) => a.id).join(';')
      };
    },
    { retryDelay: 1000 }
  );
}

export function useEvents(d2: any, trackedEntityInstance: string) {
  const api = d2.Api.getApi();
  return useQuery<any, Error>(
    ['events', trackedEntityInstance],
    async () => {
      const { events } = await api.get(`events.json`, {
        programStage: PROGRAM_STAGE,
        paging: false,
        trackedEntityInstance
      });

      return events.filter((event: any) => !!event.eventDate).map(({ dataValues, ...others }: any) => {
        return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) }
      });
    },
    { retryDelay: 1000 }
  );
}
