import Event from '@/classes/Event'

const event = new Event();

describe('Event.js', () => {

  it('Initializes the expected keys and properties', () => {
    let expectedKeys = ['uuid', 'title', 'created_at',];
    let uuidRegExp = '(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}';

    expect( Object.keys(event) ).toEqual(expectedKeys);
    expect(event.uuid).toMatch( new RegExp(uuidRegExp) );
    expect(event.title).toBe('');
    expect(event.created_at.getTime() ).toBeDefined();
  });


})
