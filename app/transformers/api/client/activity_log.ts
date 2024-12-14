import ActivityLog from '#models/activity_log'

export default function activityLogTransformer(activity: ActivityLog) {
  return {
    object: 'activity_log',
    attributes: {
      id: activity.id,
      batch: activity.batch,
      event: activity.event,
      is_api: activity.apiKeyId !== null,
      ip: activity.ip,
      description: activity.description,
      properties: activity.properties,
      has_additional_metadata: false,
      timestamp: activity.timestamp,
      actor: {
        id: activity.actorId,
      },
    },
  }
}
