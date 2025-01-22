import { UniqueId } from "@/core/entities/unique-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification";
import {faker} from '@faker-js/faker'

export function makeNotification(
    overrride : Partial<NotificationProps> = {},
    id?:UniqueId
){
    const notification = Notification.create({
        recipientId : new UniqueId(),
        content : faker.lorem.sentence(10).toString(),
        title: faker.lorem.sentence(4).toString() ,
        ...overrride,
    }, id)

    return notification
}