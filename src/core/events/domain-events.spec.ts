import { AggregateRoot } from "../entities/agregate-root";
import { UniqueId } from "../entities/unique-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";



class CustomAggregateCreated implements DomainEvent{ 
    public ocurredAt : Date 
    private aggregate : CustomAggregate


    constructor(aggregate : CustomAggregate){
        this.aggregate = aggregate
        this.ocurredAt = new Date()
    }

    public getAggregateId():UniqueId{
        return this.aggregate.id
    }
}

class CustomAggregate extends AggregateRoot<any>{
    static create () {
        const aggregate = new CustomAggregate(null)
        aggregate.addDomainEvent( new CustomAggregateCreated(aggregate) )
        return aggregate
    }
}

describe('domain events', () => {
    it('should be able to dispatch and listen to evets', () => {

        const callbackSpy = vi.fn()

        DomainEvents.register( callbackSpy, CustomAggregateCreated.name )

        const aggregate = CustomAggregate.create()

        expect(aggregate.domainEvents).toHaveLength(1)

        
        DomainEvents.dispatchEventsForAggregate(aggregate.id)
        

        expect(callbackSpy).toHaveBeenCalled()
        expect(aggregate.domainEvents).toHaveLength(0)
    })
})